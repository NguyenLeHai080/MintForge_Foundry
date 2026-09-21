from typing import Any, Generic, Optional, TypeVar
from pydantic import BaseModel

T = TypeVar("T")

class ApiResponse(BaseModel, Generic[T]):
    success: bool = True
    message: str = "Thành công"
    data: Optional[T] = None
    error: Optional[Any] = None

class PaginatedData(BaseModel, Generic[T]):
    items: list[T]
    total: int
    page: int
    size: int
    pages: int
