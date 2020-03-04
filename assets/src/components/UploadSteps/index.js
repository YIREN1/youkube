import { Steps, Button, message, Modal } from 'antd';
import React from 'react';
import UploadVideoModal from './steps/UploadVideoModal';
import UploadVideoDetailsPage from './steps/UploadVideoDetailsPage';

const { Step } = Steps;

class UploadSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      title: '',
      filePath: '',
      duration: '',
      thumbnailList: [],
    };
  }
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }
  handleChange = newState=> {
    this.setState({ ...newState });
  };

  render() {
    const steps = [
      {
        title: 'Upload',
        content: (
          <UploadVideoModal
            handleChange={this.handleChange.bind(this)}
            onFinish={this.next.bind(this)}
          />
        ),
      },
      {
        title: 'Details',
        content: <UploadVideoDetailsPage {...this.state} />,
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
