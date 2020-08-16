import React from "react";

interface IErrorBoundaryProps {
    children: any;
}

interface IErrorBoundaryState {
    error?: any;
    errorInfo?: any;
}

class ErrorBoundary extends React.PureComponent<IErrorBoundaryProps, IErrorBoundaryState> {
    constructor(props) {
        super(props);
        this.state = { error: null, errorInfo: null };
    }

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    }

    render() {
        let { errorInfo, error } = this.state;
        let { children } = this.props;
        if (errorInfo) {
            // Error path
            return (
                <div style={{ padding: '10vw', backgroundColor: "whitesmoke" }}>
                    <h2>Hình như có gì đó không ổn 😀😀😀🚧🚧🚧</h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        <p>
                            {error ? error.toString() : "Lỗi không rõ ràng!💩💩💩"}
                        </p>
                        <br />
                        <p>
                            {errorInfo ? errorInfo.componentStack : "Có lỗi tại đây!💩💩"}
                        </p>
                    </details>
                </div>
            );
        } else
            // Normally, just render children
            return children
    }
}

export default ErrorBoundary;