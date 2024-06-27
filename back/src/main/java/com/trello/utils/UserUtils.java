package com.trello.utils;

import com.trello.model.Role;
import com.trello.model.User;

public final class UserUtils {

    public static boolean isAdmin(User user) {
        return user.getRole().equals(Role.ADMIN);
    }

}
