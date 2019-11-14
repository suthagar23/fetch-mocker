import React from 'react';
import Modal from './components/Modal';
import Button from './components/Button';

const dispatchFetchMockerResponse = (responseCode) => {
  document.dispatchEvent(new CustomEvent('FETCH_MOCKER_RESPONSE', {
    detail: { responseCode },
  }));
};

const generateResponseButtons = (responseCodes, onModalResponseButtonClick) => {
  const responseButtons = [];
  for (let index = 0; index < responseCodes.length; index += 1) {
    const responseCode = responseCodes[index];
    if (responseCode !== 'default') {
      responseButtons.push(
        <Button
          key={responseCode}
          text={responseCode}
          onModalResponseButtonClick={onModalResponseButtonClick} />,
      );
    }
  }
  return responseButtons;
};

class ResponseCustomizer extends React.Component {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      requestPath: '',
      requestMethod: '',
      responseCodes: [],
    };
    this.onModalResponseButtonClick = this.onModalResponseButtonClick.bind(this);
    this.onModalVisbilityChangeEvent = this.onModalVisbilityChangeEvent.bind(this);
  }

  componentDidMount() {
    document.addEventListener('FETCH_MOCKER_MODAL_VISIBLE', this.onModalVisbilityChangeEvent);
  }

    onModalVisbilityChangeEvent = ({ detail }) => {
      const {
        visibility, requestPath, requestMethod, responseCodes,
      } = detail || {};
      this.setState({
        modalVisible: visibility, requestPath, requestMethod, responseCodes,
      });
    }

    onModalResponseButtonClick = (e) => {
      this.setState({ modalVisible: false });
      dispatchFetchMockerResponse(e.target.dataset.response);
    }

    render() {
      const {
        modalVisible, requestPath, requestMethod, responseCodes,
      } = this.state;
      return (
        <>
          {modalVisible && (
            <>
              <Modal
                isModalOpen={modalVisible}
                closeModal={this.closeModal}>
                <h3> Request Found</h3>
                <p> <b> Path</b> {requestPath}</p>
                <p> <b> Path</b> {requestMethod}</p>

                {generateResponseButtons(responseCodes, this.onModalResponseButtonClick)}
              </Modal>

            </>
          )}
        </>
      );
    }
}

export default ResponseCustomizer;
