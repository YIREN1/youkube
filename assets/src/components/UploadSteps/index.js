import { Steps, Button, message, Modal } from 'antd';
import React from 'react';
import UploadVideoModal from '../UploadVideoModal';
import UploadVideoDetailsPage from '../UploadVideoDetailsPage';

const { Step } = Steps;

class UploadSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = { current: 0 };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  render() {
    const steps = [
      {
        title: 'Upload',
        content: <UploadVideoModal onFinish={this.next.bind(this)} />,
      },
      {
        title: 'Details',
        content: <UploadVideoDetailsPage />,
      },
      {
        title: 'Finish',
        content: 'Last-content',
      },
    ];
    const { current } = this.state;
    const { visible, onCancel } = this.props;
    return (
      <Modal
        visible={visible}
        title="Upload Video"
        footer={null}
        onCancel={onCancel}
      >
        <div>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
        </div>
      </Modal>
    );
  }
}

export default UploadSteps;
