import React from "react";
import { DocumentMeta } from 'react-document-meta';
import MetaConvert from '../../utils/meta.convert';

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
        const meta = MetaConvert();
        if (errorInfo) {
            // Error path
            return (
                <div style={{ padding: '10vw' }}>
                    <h2>Something went wrong.
                      <i className="em em-bird" aria-role="presentation" aria-label="BIRD"></i>
                        <i className="em em-bird" aria-role="presentation" aria-label="BIRD"></i>
                        <i className="em em-bird" aria-role="presentation" aria-label="BIRD"></i>
                    </h2>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {error && error.toString()}
                        <br />
                        {errorInfo.componentStack}
                    </details>
                </div>
            );
        } else
            // Normally, just render children
            return <DocumentMeta {...meta}>{children}</DocumentMeta>
    }
}

export default ErrorBoundary;