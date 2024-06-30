import { Router } from "express";
import { usersService } from "../services/users-service";
import { validateProduct, validateLogin, validateUser } from "../middleware/joi";
import { isAdmin } from "../middleware/is-admin";
import { isAdminOrSelf } from "../middleware/is-admin-or-self";
import { isSelf } from "../middleware/is-self";

const router = Router();

router.put("/:id", ...isSelf, validateUser, async (req, res, next) => {
  try {
    const saved = await usersService.updateUser(req.body, req.payload._id);
    res.json(saved);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", ...isAdminOrSelf, async (req, res, next) => {
  try {
    const user = await usersService.getUserById(req.params.id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

router.get("/", ...isAdmin, async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.post("/login", validateLogin, async (req, res, next) => {
  try {
    const jwt = await usersService.loginUser(req.body);
    res.send(jwt);
  } catch (e) {
    next(e);
  }
});

router.post("/", validateUser, async (req, res, next) => {
  try {
    const result = await usersService.createUser(req.body);
    const { password, ...saved } = result.toJSON();
    //return all data but saved!
    res.status(201).json(saved);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", isAdminOrSelf, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const deletedUser = await usersService.deleteUser(userId);
    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (e) {
    next(e);
  }
});

export default router;
