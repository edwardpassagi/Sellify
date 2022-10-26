import React from "react";
import { User } from "../server/models/user";

/**
 * This script is responsible to keep track of current signed-in user.
 */
export const AuthContext = React.createContext(User);
