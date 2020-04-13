import React from 'react';
import _ from 'lodash';
import Input from 'components/UI/Input';
import './DropdownList.scss';

interface Props {
  data: TransformedData[] | [];
  onSelect: (subject: TransformedData) => void;
  displayNotFound: boolean;
  notFoundText: string;
  placeholder: string;
  inputValue: string;
  onChange: (value: string) => void;
}

interface State {
  focused: boolean;
}

const SUPER_MAGIC_NUMBER_FOR_BLUR_HANDLING = 200;

class DropdownList extends React.PureComponent<Props, State> {
  private inputRef: React.RefObject<HTMLInputElement>;

  private timeoutID: any;

  constructor(props: Props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      focused: false,
    };
  }

  setFocused = (focused: boolean) => {
    this.setState({ focused });
  };

  selectSubject = (subject: TransformedData) => {
    const { onSelect } = this.props;
    this.setFocused(false);
    onSelect(subject);
  };

  handleInputChange = (value: string) => {
    const { onChange } = this.props;
    if (value === '') {
      this.inputRef.current?.focus();
    }
    onChange(value);
  };

  handleBlur = () => {
    // What a shame :(
    const { focused } = this.state;
    this.timeoutID = setTimeout(() => {
      if (focused) {
        this.setState({
          focused: false,
        });
      }
    }, SUPER_MAGIC_NUMBER_FOR_BLUR_HANDLING);
  };

  handleFocus = () => {
    clearTimeout(this.timeoutID);
    this.setFocused(true);
  };

  render() {
    const {
      data,
      displayNotFound,
      notFoundText,
      placeholder,
      inputValue,
    } = this.props;

    const { focused } = this.state;

    return (
      <div className="select-subject">
        <Input
          onChange={value => this.handleInputChange(value)}
          placeholder={placeholder}
          value={inputValue}
          onFocus={() => this.handleFocus()}
          onBlur={() => this.handleBlur()}
          ref={this.inputRef}
        />
        {focused ? (
          <div className="select-dropdown">
            {displayNotFound ? (
              <div
                className="select-dropdown-item not-found"
              >
                {notFoundText}
              </div>
            ) : null}
            {_.map(data, subject => (
              <div
                className="select-dropdown-item"
                key={subject.name}
                onClick={() => this.selectSubject(subject)}
              >
                {subject.name}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

export default DropdownList;
