package com.trello.utils;

import com.trello.dto.ErrorDto;

public final class ErrorUtils {

    public static ErrorDto getErrorDto(String message) {
        return ErrorDto.builder().message(message).build();
    }
}
