h3 Worksvn-web-school-event là projecct front-end của https://works.vn/ viết bằng thư viện React + Typescript. Tên project là do web chỉnh sửa từ web-school-event sang worksvn

h2 Các tính năng của web works.vn

1. Đăng ký, đăng nhập tài khoản
2. Cập nhật thông tin tài khoản người dùng
3. Bộ lọc tìm kiếm việc làm (loại công việc, tỉnh thành, tên công việc, bài đăng nổi bật)
4. Hiện thị chi tiết thông tin việc làm
5. Hiển thị công ty tuyển dụng
6. Bài viết, chủ đề.
7. Sự kiện

h2 API
Worksvn được chia làm 6 service xử lý nghiệp vụ chính:

- worksvn-authentication-server: xác thực và ủy quyền người dùng
- worksvn-public-service: nhóm API public, không yêu cầu xác thưc người dùng
- worksvn-candidate-service: nhóm API ứng viên, yêu cầu xác thực người dùng có tài khoản ứng viên
- worksvn-employer-service: nhóm API NTD, yêu cầu xác thực người dùng có tài khoản NTD
- worksvn-admin-service: nhóm API quản trị, yêu cầu xác thực người dùng có tài khoản quản trị viên
- worksvn-school-service: nhóm API của nhà trường, yêu cầu tài khoản của nhà trường

h2 Công nghệ chủ đạo

- ReactJs: https://reactjs.org/
- Typescpipt: https://www.typescriptlang.org/
- Ant design: Giao diện UI lấy từ thư viện antd https://ant.design/
- SCSS: css viết bằng SCSS
- Luồng dữ liệu: Viết bằng Redux-saga

- Viết kiểu class component và quản lý state kiểu cũ, dùng setState và redux.
- Các config khi dev ở file ".env.development", các config khi build product ở file ".env.production"
  h2 Các thư mục chính trong src
- assets: Chứa font chữ và các ảnh của project
- config: module hiển thị thông báo (Thông báo sử dụng thư viện https://www.npmjs.com/package/sweetalert)
  h3 CONST: 1. actions: file chưa tên type action của redux. Gồm REDUX: action thường của redux. REDUX_SAGA: action của REDUX-SAGA. Lưu ý giá trị của các const trong file giữa redux và redux-saga có khác nhau, nên lưu ý để tránh có bug khó hiểu. ví dụ:
  REDUX.EMPLOYER.DETAIL = "GET_EMPLOYER_DETAILCHOOL" và REDUX_SAGA.EMPLOYER.DETAIL = "GET_EMPLOYER_DETAIL_DATA" 2. exception: chứa lỗi và thông tin lỗi. Về sau API trả về cả nội dung lỗi nên ít dùng 3. icon 4. method: chứa 4 method của RESTfuls API 5. type: một số hằng số sẽ thường dùng lặp lại

h3 ENVIRONMENT: Chứa config của các API.

h3 MODELS: Chứa config các model sử dụng cho TS. Khi thêm thuộc tính ở các views thì cần chỉnh sửa cả trong models để đảm bảo thống nhất

h3 REDUX: Luồng dữ liệu chạy như sau: Khi có views có yêu cầu -> yêu cầu từ actions -> chạy đến các middieware là file các file trong watcher -> đưa vào store redux -> push state về views

1.  actions: không biết để làm gì
2.  reducers: để chứa reducers đưa state vào store
3.  store: các khởi tạo chung của redux, redux-saga
4.  watcher: các miđieware của redux-saga

h3 SERVICES: file chứa các module quan trọng riêng của project

1. api: các hằng số chứa địa chỉ tới api cần dùng. Chia làm private và public. Về sau nên chia hẳn ra theo các tính cụm tính năng chứ không nên gội nguyên.
2. auth: chứa các hàm liên quan đến xác thực người dùng.
3. base-api: project fetch api bằng axios nhưng có chỉnh sửa thêm để thuận lợi hơn và nhanh trong việc gọi câu lệnh fetch api. Hàm sẽ gồm (\_get, \_post, \_put, \_delete) và nên gọi api bằng các hàm này. Chi tiết các tham số của từng hàm có trong ./services/base-api.
4. clear-storage: Gọi hàm khi đăng xuất để clear hết access token, refresh token và các data trong local storage
5. exec: Hàm gọi api đè lên hàm base-api nhưng để thêm try-catch và hiện thông báo người dùng sau các thông báo server trả về. Thực tế thường gọi api bằng hàm này sẽ đỡ xử lý thêm thông báo trả về.
6. search-module: dự định tạo thuật toán để tìm kiếm, nhưng hiện đang die và không có ứng dụng thực tế lắm.

h3 UTILS chứa các module khác

1. CheckImage: dùng cho ảnh bìa countdown khi có sự kiện diễn ra.
2.

h3 VIEW: gồm các file chứa các router của app. Chú ý một số file sau

1. layout: Chứa các Component dùng lại nhiều của app. Viết component dùng chung thì đưa vào đây.
2. index.tsx: Tất các router đều dùng lazy loading để tối ưu dung lượng loading. Ví dụ:
   const EventHome = loadMeta(() =>
   import("./event").then((module) => module.default)
   );
3. routes: Chứa 2 file ErrorBoudary và LoadMeta.

- ErrorBoudary: giúp hiện lỗi nhưng không crash app. Chi tiết tại https://reactjs.org/docs/error-boundaries.html
- LoadMeta: Chưa nghiên cứu
- Nhớ là quản lý data lấy từ api đều bằng redux nên cần đọc kỹ code trước khi làm.

Các file ngoài:
h3 .gitgnore: Các file mình không muốn đưa lên git bằng lệnh push
h3 webpack.common.js: Dùng để nén file giúp dung lượng web app nhẹ.
