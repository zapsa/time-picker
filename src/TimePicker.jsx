import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ZapIcon from '@zapsa/zap-icons';
import onClickOutside from 'react-onclickoutside';
import Panel from './Panel';

function refFn(field, component) {
  this[field] = component;
}

class ZapTimePicker extends Component {
  static propTypes = {
    prefixCls: PropTypes.string,
    inputProps: PropTypes.shape(),
    inputClassName: PropTypes.string,
    clearText: PropTypes.string,
    key: PropTypes.string,
    value: PropTypes.object,
    defaultOpenValue: PropTypes.object,
    inputReadOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    allowEmpty: PropTypes.bool,
    defaultValue: PropTypes.object,
    open: PropTypes.bool,
    defaultOpen: PropTypes.bool,
    placeholder: PropTypes.string,
    format: PropTypes.string,
    showHour: PropTypes.bool,
    showMinute: PropTypes.bool,
    showSecond: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
    popupClassName: PropTypes.string,
    disabledHours: PropTypes.func,
    disabledMinutes: PropTypes.func,
    disabledSeconds: PropTypes.func,
    hideDisabledOptions: PropTypes.bool,
    onChange: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    addon: PropTypes.func,
    name: PropTypes.string,
    autoComplete: PropTypes.string,
    use12Hours: PropTypes.bool,
    hourStep: PropTypes.number,
    minuteStep: PropTypes.number,
    secondStep: PropTypes.number,
    focusOnOpen: PropTypes.bool,
    onKeyDown: PropTypes.func,
    children: PropTypes.node,
    autoFocus: PropTypes.bool,
  };

  static defaultProps = {
    key: 'rcTimePicker',
    clearText: 'clear',
    prefixCls: 'rc-time-picker',
    disabled: false,
    defaultOpen: false,
    autoFocus: false,
    inputReadOnly: false,
    style: {},
    className: '',
    popupClassName: '',
    inputClassName: null,
    defaultOpenValue: moment(),
    allowEmpty: true,
    showHour: true,
    showMinute: true,
    showSecond: true,
    disabledHours: () => {},
    disabledMinutes: () => {},
    disabledSeconds: () => {},
    hideDisabledOptions: false,
    onChange: () => {},
    onOpen: () => {},
    onClose: () => {},
    onFocus: () => {},
    onBlur: () => {},
    addon: () => {},
    use12Hours: false,
    focusOnOpen: false,
    onKeyDown: () => {},
    inputProps: {},
  };

  constructor(props) {
    super(props);
    this.saveInputRef = refFn.bind(this, 'picker');
    this.savePanelRef = refFn.bind(this, 'panelInstance');
    const {
      defaultOpen, defaultValue, open = defaultOpen, value = defaultValue,
    } = props;
    this.state = {
      open,
      value,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { value, open } = nextProps;
    if ('value' in nextProps) {
      this.setState({
        value,
      });
    }
    if (open !== undefined) {
      this.setState({ open });
    }
  }

  onPanelChange = (value) => {
    this.setValue(value);
  };

  onPanelClear = () => {
    this.setValue(null);
    this.setOpen(false);
  };

  onVisibleChange = (open) => {
    this.setOpen(open);
  };

  onEsc = () => {
    this.setOpen(false);
    this.focus();
  };

  onKeyDown = (e) => {
    if (e.keyCode === 40) {
      this.setOpen(true);
    }
  };

  setValue(value) {
    if (!('value' in this.props)) {
      this.setState({
        value,
      });
    }
    this.props.onChange(value);
  }

  getFormat() {
    const {
      format, showHour, showMinute, showSecond, use12Hours,
    } = this.props;
    if (format) {
      return format;
    }

    if (use12Hours) {
      const fmtString = [showHour ? 'h' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : '']
        .filter(item => !!item)
        .join(':');

      return fmtString.concat(' a');
    }

    return [showHour ? 'HH' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : '']
      .filter(item => !!item)
      .join(':');
  }

  getPanelElement() {
    const {
      prefixCls,
      placeholder,
      disabledHours,
      disabledMinutes,
      disabledSeconds,
      hideDisabledOptions,
      inputReadOnly,
      allowEmpty,
      showHour,
      showMinute,
      showSecond,
      defaultOpenValue,
      clearText,
      addon,
      use12Hours,
      focusOnOpen,
      onKeyDown,
      hourStep,
      minuteStep,
      secondStep,
    } = this.props;
    return (
      <Panel
        clearText={clearText}
        prefixCls={`${prefixCls}-panel`}
        ref={this.savePanelRef}
        value={this.state.value}
        inputReadOnly={inputReadOnly}
        onChange={this.onPanelChange}
        onClear={this.onPanelClear}
        defaultOpenValue={defaultOpenValue}
        showHour={showHour}
        showMinute={showMinute}
        showSecond={showSecond}
        onEsc={this.onEsc}
        allowEmpty={allowEmpty}
        format={this.getFormat()}
        placeholder={placeholder}
        disabledHours={disabledHours}
        disabledMinutes={disabledMinutes}
        disabledSeconds={disabledSeconds}
        hideDisabledOptions={hideDisabledOptions}
        use12Hours={use12Hours}
        hourStep={hourStep}
        minuteStep={minuteStep}
        secondStep={secondStep}
        addon={addon}
        focusOnOpen={focusOnOpen}
        onKeyDown={onKeyDown}
        open={this.state.open}
      />
    );
  }

  getPopupClassName() {
    const {
      showHour, showMinute, showSecond, use12Hours, prefixCls,
    } = this.props;
    let popupClassName = this.props.popupClassName;
    if ((!showHour || !showMinute || !showSecond) && !use12Hours) {
      popupClassName += ` ${prefixCls}-panel-narrow`;
    }
    let selectColumnCount = 0;
    if (showHour) {
      selectColumnCount += 1;
    }
    if (showMinute) {
      selectColumnCount += 1;
    }
    if (showSecond) {
      selectColumnCount += 1;
    }
    if (use12Hours) {
      selectColumnCount += 1;
    }
    popupClassName += ` ${prefixCls}-panel-column-${selectColumnCount}`;
    return popupClassName;
  }

  setOpen(open) {
    const { onOpen, onClose } = this.props;
    if (this.state.open !== open) {
      if (!('open' in this.props)) {
        this.setState({ open });
      }
      if (open) {
        onOpen({ open });
      } else {
        onClose({ open });
      }
    }
  }

  focus() {
    this.picker.focus();
  }

  blur() {
    this.picker.blur();
  }

  handleClickOutside(evt) {
    if (this.state.open && !this.props.open) {
      this.setState({ open: false }, () => {
        this.props.onBlur(this.state.value);
      });
    }
  }

  render() {
    const {
      placeholder,
      disabled,
      style,
      className,
      name,
      autoComplete,
      autoFocus,
      inputReadOnly,
      key,
    } = this.props;
    const { open, value } = this.state;
    return (
      <div
        className={`form-group rtp${open ? ' rtpOpen' : ''}${className ? ` ${className}` : ''}`}
        style={style}
        key={key}
      >
        <input
          className={`form-control${
            this.props.inputClassName ? ` ${this.props.inputClassName}` : ''
          }`}
          ref={this.saveInputRef}
          type="text"
          name={name}
          key={`${key}Input`}
          onKeyDown={this.onKeyDown}
          disabled={disabled}
          value={(value && value.format(this.getFormat())) || ''}
          autoComplete={autoComplete}
          {...this.props.inputProps}
          onFocus={() => {
            this.setState({ open: true }, () => {
              this.props.onFocus();
            });
            if (this.props.inputProps.onFocus) {
              this.props.inputProps.onFocus();
            }
          }}
          autoFocus={autoFocus}
          onChange={() => {}}
          readOnly={!!inputReadOnly}
        />
        <label className="form-control-label">{placeholder}</label>
        {this.props.children}
        <button
          key={`${key}ClearButton`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
              value: null,
              open: false,
            });
            this.props.onChange(null);
          }}
          className="rtpClear"
        >
          <ZapIcon icon="errorCircle--solid" />
        </button>
        <div className="rtpWrapper" key={`${key}Wrapper`}>
          <div className="rtpPicker">{this.getPanelElement()}</div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(ZapTimePicker);
