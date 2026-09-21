from fastapi import HTTPException, Request, status
from fastapi.responses import JSONResponse

class AppException(HTTPException):
    def __init__(self, status_code: int, error_code: str, message: str, details: dict = None):
        super().__init__(status_code=status_code, detail=message)
        self.error_code = error_code
        self.message = message
        self.details = details or {}

class UnauthorizedException(AppException):
    def __init__(self, message: str = "Không có quyền truy cập", details: dict = None):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            error_code="UNAUTHORIZED",
            message=message,
            details=details
        )

class ForbiddenException(AppException):
    def __init__(self, message: str = "Tài khoản không đủ quyền hạn thực hiện hành động này"):
        super().__init__(
            status_code=status.HTTP_403_FORBIDDEN,
            error_code="FORBIDDEN_ACTION",
            message=message
        )

class NotFoundException(AppException):
    def __init__(self, resource: str, resource_id: str):
        super().__init__(
            status_code=status.HTTP_404_NOT_FOUND,
            error_code="RESOURCE_NOT_FOUND",
            message=f"{resource} với mã '{resource_id}' không tồn tại"
        )

class InsufficientCreditsException(AppException):
    def __init__(self, required: int, available: int):
        super().__init__(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            error_code="INSUFFICIENT_CREDITS",
            message="Số dư credits không đủ để thực hiện yêu cầu này",
            details={"required": required, "available": available}
        )

async def app_exception_handler(request: Request, exc: AppException):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": {
                "code": exc.error_code,
                "message": exc.message,
                "details": exc.details
            }
        }
    )
