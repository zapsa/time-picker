'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _zapIcons = require('@zapsa/zap-icons');

var _zapIcons2 = _interopRequireDefault(_zapIcons);

var _reactOnclickoutside = require('react-onclickoutside');

var _reactOnclickoutside2 = _interopRequireDefault(_reactOnclickoutside);

var _Panel = require('./Panel');

var _Panel2 = _interopRequireDefault(_Panel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function refFn(field, component) {
  this[field] = component;
}

var ZapTimePicker = function (_Component) {
  _inherits(ZapTimePicker, _Component);

  function ZapTimePicker(props) {
    _classCallCheck(this, ZapTimePicker);

    var _this = _possibleConstructorReturn(this, (ZapTimePicker.__proto__ || Object.getPrototypeOf(ZapTimePicker)).call(this, props));

    _initialiseProps.call(_this);

    _this.saveInputRef = refFn.bind(_this, 'picker');
    _this.savePanelRef = refFn.bind(_this, 'panelInstance');
    var defaultOpen = props.defaultOpen,
        defaultValue = props.defaultValue,
        _props$open = props.open,
        open = _props$open === undefined ? defaultOpen : _props$open,
        _props$value = props.value,
        value = _props$value === undefined ? defaultValue : _props$value;

    _this.state = {
      open: open,
      value: value
    };
    return _this;
  }

  _createClass(ZapTimePicker, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var value = nextProps.value,
          open = nextProps.open;

      if ('value' in nextProps) {
        this.setState({
          value: value
        });
      }
      if (open !== undefined) {
        this.setState({ open: open });
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (!('value' in this.props)) {
        this.setState({
          value: value
        });
      }
      this.props.onChange(value);
    }
  }, {
    key: 'getFormat',
    value: function getFormat() {
      var _props = this.props,
          format = _props.format,
          showHour = _props.showHour,
          showMinute = _props.showMinute,
          showSecond = _props.showSecond,
          use12Hours = _props.use12Hours;

      if (format) {
        return format;
      }

      if (use12Hours) {
        var fmtString = [showHour ? 'h' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : ''].filter(function (item) {
          return !!item;
        }).join(':');

        return fmtString.concat(' a');
      }

      return [showHour ? 'HH' : '', showMinute ? 'mm' : '', showSecond ? 'ss' : ''].filter(function (item) {
        return !!item;
      }).join(':');
    }
  }, {
    key: 'getPanelElement',
    value: function getPanelElement() {
      var _props2 = this.props,
          prefixCls = _props2.prefixCls,
          placeholder = _props2.placeholder,
          disabledHours = _props2.disabledHours,
          disabledMinutes = _props2.disabledMinutes,
          disabledSeconds = _props2.disabledSeconds,
          hideDisabledOptions = _props2.hideDisabledOptions,
          inputReadOnly = _props2.inputReadOnly,
          allowEmpty = _props2.allowEmpty,
          showHour = _props2.showHour,
          showMinute = _props2.showMinute,
          showSecond = _props2.showSecond,
          defaultOpenValue = _props2.defaultOpenValue,
          clearText = _props2.clearText,
          addon = _props2.addon,
          use12Hours = _props2.use12Hours,
          focusOnOpen = _props2.focusOnOpen,
          onKeyDown = _props2.onKeyDown,
          hourStep = _props2.hourStep,
          minuteStep = _props2.minuteStep,
          secondStep = _props2.secondStep;

      return _react2.default.createElement(_Panel2.default, {
        clearText: clearText,
        prefixCls: prefixCls + '-panel',
        ref: this.savePanelRef,
        value: this.state.value,
        inputReadOnly: inputReadOnly,
        onChange: this.onPanelChange,
        onClear: this.onPanelClear,
        defaultOpenValue: defaultOpenValue,
        showHour: showHour,
        showMinute: showMinute,
        showSecond: showSecond,
        onEsc: this.onEsc,
        allowEmpty: allowEmpty,
        format: this.getFormat(),
        placeholder: placeholder,
        disabledHours: disabledHours,
        disabledMinutes: disabledMinutes,
        disabledSeconds: disabledSeconds,
        hideDisabledOptions: hideDisabledOptions,
        use12Hours: use12Hours,
        hourStep: hourStep,
        minuteStep: minuteStep,
        secondStep: secondStep,
        addon: addon,
        focusOnOpen: focusOnOpen,
        onKeyDown: onKeyDown,
        open: this.state.open
      });
    }
  }, {
    key: 'getPopupClassName',
    value: function getPopupClassName() {
      var _props3 = this.props,
          showHour = _props3.showHour,
          showMinute = _props3.showMinute,
          showSecond = _props3.showSecond,
          use12Hours = _props3.use12Hours,
          prefixCls = _props3.prefixCls;

      var popupClassName = this.props.popupClassName;
      if ((!showHour || !showMinute || !showSecond) && !use12Hours) {
        popupClassName += ' ' + prefixCls + '-panel-narrow';
      }
      var selectColumnCount = 0;
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
      popupClassName += ' ' + prefixCls + '-panel-column-' + selectColumnCount;
      return popupClassName;
    }
  }, {
    key: 'setOpen',
    value: function setOpen(open) {
      var _props4 = this.props,
          onOpen = _props4.onOpen,
          onClose = _props4.onClose;

      if (this.state.open !== open) {
        if (!('open' in this.props)) {
          this.setState({ open: open });
        }
        if (open) {
          onOpen({ open: open });
        } else {
          onClose({ open: open });
        }
      }
    }
  }, {
    key: 'focus',
    value: function focus() {
      this.picker.focus();
    }
  }, {
    key: 'blur',
    value: function blur() {
      this.picker.blur();
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside(evt) {
      var _this2 = this;

      if (this.state.open && !this.props.open) {
        this.setState({ open: false }, function () {
          _this2.props.onBlur(_this2.state.value);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props5 = this.props,
          placeholder = _props5.placeholder,
          disabled = _props5.disabled,
          style = _props5.style,
          className = _props5.className,
          name = _props5.name,
          autoComplete = _props5.autoComplete,
          autoFocus = _props5.autoFocus,
          inputReadOnly = _props5.inputReadOnly,
          key = _props5.key;
      var _state = this.state,
          open = _state.open,
          value = _state.value;

      return _jsx('div', {
        className: 'form-group rtp' + (open ? ' rtpOpen' : '') + (className ? ' ' + className : ''),
        style: style
      }, key, _react2.default.createElement('input', _extends({
        className: 'form-control' + (this.props.inputClassName ? ' ' + this.props.inputClassName : ''),
        ref: this.saveInputRef,
        type: 'text',
        name: name,
        key: key + 'Input',
        onKeyDown: this.onKeyDown,
        disabled: disabled,
        value: value && value.format(this.getFormat()) || '',
        autoComplete: autoComplete
      }, this.props.inputProps, {
        onFocus: function onFocus() {
          _this3.setState({ open: true }, function () {
            _this3.props.onFocus();
          });
          if (_this3.props.inputProps.onFocus) {
            _this3.props.inputProps.onFocus();
          }
        },
        autoFocus: autoFocus,
        onChange: function onChange() {},
        readOnly: !!inputReadOnly
      })), _jsx('label', {
        className: 'form-control-label'
      }, void 0, placeholder), this.props.children, _jsx('button', {
        onClick: function onClick(e) {
          e.preventDefault();
          e.stopPropagation();
          _this3.setState({
            value: null,
            open: false
          });
          _this3.props.onChange(null);
        },
        className: 'rtpClear'
      }, key + 'ClearButton', _jsx(_zapIcons2.default, {
        icon: 'errorCircle--solid'
      })), _jsx('div', {
        className: 'rtpWrapper'
      }, key + 'Wrapper', _jsx('div', {
        className: 'rtpPicker'
      }, void 0, this.getPanelElement())));
    }
  }]);

  return ZapTimePicker;
}(_react.Component);

ZapTimePicker.propTypes = {
  prefixCls: _propTypes2.default.string,
  inputProps: _propTypes2.default.shape(),
  inputClassName: _propTypes2.default.string,
  clearText: _propTypes2.default.string,
  key: _propTypes2.default.string,
  value: _propTypes2.default.object,
  defaultOpenValue: _propTypes2.default.object,
  inputReadOnly: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  allowEmpty: _propTypes2.default.bool,
  defaultValue: _propTypes2.default.object,
  open: _propTypes2.default.bool,
  defaultOpen: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  format: _propTypes2.default.string,
  showHour: _propTypes2.default.bool,
  showMinute: _propTypes2.default.bool,
  showSecond: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  popupClassName: _propTypes2.default.string,
  disabledHours: _propTypes2.default.func,
  disabledMinutes: _propTypes2.default.func,
  disabledSeconds: _propTypes2.default.func,
  hideDisabledOptions: _propTypes2.default.bool,
  onChange: _propTypes2.default.func,
  onOpen: _propTypes2.default.func,
  onClose: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  addon: _propTypes2.default.func,
  name: _propTypes2.default.string,
  autoComplete: _propTypes2.default.string,
  use12Hours: _propTypes2.default.bool,
  hourStep: _propTypes2.default.number,
  minuteStep: _propTypes2.default.number,
  secondStep: _propTypes2.default.number,
  focusOnOpen: _propTypes2.default.bool,
  onKeyDown: _propTypes2.default.func,
  children: _propTypes2.default.node,
  autoFocus: _propTypes2.default.bool
};
ZapTimePicker.defaultProps = {
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
  defaultOpenValue: (0, _moment2.default)(),
  allowEmpty: true,
  showHour: true,
  showMinute: true,
  showSecond: true,
  disabledHours: function disabledHours() {},
  disabledMinutes: function disabledMinutes() {},
  disabledSeconds: function disabledSeconds() {},
  hideDisabledOptions: false,
  onChange: function onChange() {},
  onOpen: function onOpen() {},
  onClose: function onClose() {},
  onFocus: function onFocus() {},
  onBlur: function onBlur() {},
  addon: function addon() {},
  use12Hours: false,
  focusOnOpen: false,
  onKeyDown: function onKeyDown() {},
  inputProps: {}
};

var _initialiseProps = function _initialiseProps() {
  var _this4 = this;

  this.onPanelChange = function (value) {
    _this4.setValue(value);
  };

  this.onPanelClear = function () {
    _this4.setValue(null);
    _this4.setOpen(false);
  };

  this.onVisibleChange = function (open) {
    _this4.setOpen(open);
  };

  this.onEsc = function () {
    _this4.setOpen(false);
    _this4.focus();
  };

  this.onKeyDown = function (e) {
    if (e.keyCode === 40) {
      _this4.setOpen(true);
    }
  };
};

exports.default = (0, _reactOnclickoutside2.default)(ZapTimePicker);