<!-- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify -->

1. Gộp lại css
2. Chỉnh lại chỗ để local Storage
3. Đưa code 1 số chỗ quá nhiều dòng sang file
4. Sửa lại const Action redux
5. Gộp nhóm API, nhóm Action
6. lịch sử điện thoại bug
7. Xem lại side bar
8. Tính toán lại thanh trượt ở branch


NODE_ENV=production
SKIP_PREFLIGHT_CHECK=true
GENERATE_SOURCEMAP=false

PORT=3000
REACT_APP_API_HOST=http://develop.works.vn:8000
REACT_APP_CLIENT_ID=worksvn-student-web
REACT_APP_CLIENT_SECRET=worksvn-student-web@works.vn
REACT_APP_GOOGLE_API_KEY=AIzaSyAYQTUU1rbxfmp5_ik3euXX9B5-VSnDos4

REACT_APP_ENABLE_LOGGING=false
REACT_APP_EVENT_ID=da316eca-054d-42e0-8483-6060f2a4427e
REACT_APP_SCHOOL_ID=aca162fe-01ff-4909-a1f1-740317d1c2e5
REACT_APP_SCHOOL_NAME=NHVL Online
REACT_APP_HOST_FORWARD = https://works.vn