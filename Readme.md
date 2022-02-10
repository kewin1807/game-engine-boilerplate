# The template for typescript server

### Working
* Project được khởi tạo từ Nodejs, ExpressJs, sử dụng database nhỏ gọn để làm demo là sqlite.
* Project được dựng dựa trên 2 pattern chính là Repository Pattern và Dependency injection. Lí do sử dụng Dependency injection, các class sẽ không phụ thuộc trực tiếp lẫn nhau mà thay vào đó chúng sẽ liên kết với nhau thông qua một Interface hoặc base class (đối với một số ngôn ngữ không hỗ trợ Interface). Việc khởi tạo các class sẽ do các Interface quản lí thay vì class phụ thuộc nó

## Usage
* install typescript (```npm install -g typescript```)
* install lib (```yarn```)
* compile code (```yarn compile```)
* run code (```yarn dev```)

## Core feature
* Sử dụng thư viện inversifyJs để control các interface và class liên kết với nhau
* Cấu trúc MVC, trong đó controller(api layer), services(service layer), repository(database layer)
* Ngoài ra còn sử dụng một số các kĩ thuật nhỏ
    * folder errors: kiểm soát các lỗi, và trả về định dạng khi gặp lỗi, {statusCode, message}
    * folder validations: tạo middleware validation trước khi vào api layer, (ví dụ khi create 1 quyển sách mới, phải check các trường ko bị null), sử dụng express-validator library
    * logger: tạo log cho project

* Nếu có thời gian sẽ làm thêm middleware cho việc authenticate, hay tạo automapper giữa các class model vs nhau. Ngoài ra sẽ sử dụng sql database, để dễ dàng viết file sql và procedure