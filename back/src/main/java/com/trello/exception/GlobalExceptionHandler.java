package com.trello.exception;

import com.trello.dto.ErrorDto;
import com.trello.utils.ErrorUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RequiredHeaderNotFoundException.class)
    public ResponseEntity<ErrorDto> handleRequiredHeaderNotFoundException(RequiredHeaderNotFoundException ex) {
        ErrorDto errorDto = ErrorUtils.getErrorDto(ex.getMessage());

        return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(TokenNotValidException.class)
    public ResponseEntity<ErrorDto> handleTokenNotValidException(TokenNotValidException ex) {
        ErrorDto errorDto = ErrorUtils.getErrorDto(ex.getMessage());

        return new ResponseEntity<>(errorDto, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorDto> handleUnauthorizedException(UnauthorizedException ex) {
        ErrorDto errorDto = ErrorUtils.getErrorDto(ex.getMessage());

        return new ResponseEntity<>(errorDto, HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorDto> handleUserNotFoundException(UserNotFoundException ex) {
        ErrorDto errorDto = ErrorUtils.getErrorDto(ex.getMessage());

        return new ResponseEntity<>(errorDto, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ErrorDto> handleBadRequestException(BadRequestException ex) {
        ErrorDto errorDto = ErrorUtils.getErrorDto(ex.getMessage());

        return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ItemExistsException.class)
    public ResponseEntity<ErrorDto> handleItemExistsException(ItemExistsException ex) {
        ErrorDto errorDto = ErrorUtils.getErrorDto(ex.getMessage());

        return new ResponseEntity<>(errorDto, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorDto> handleForbiddenException(ForbiddenException ex) {
        ErrorDto errorDto = ErrorUtils.getErrorDto(ex.getMessage());

        if (ex.getMessage().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        return new ResponseEntity<>(errorDto, HttpStatus.FORBIDDEN);
    }
}
