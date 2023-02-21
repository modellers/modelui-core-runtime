import { _ as _inherits, a as _createSuper, b as _createClass, c as _classCallCheck, d as _defineProperty, e as _assertThisInitialized } from '../_rollupPluginBabelHelpers-55d249d8.js';
import { Component } from 'react';

var StateBaseComponent = /*#__PURE__*/function (_Component) {
  _inherits(StateBaseComponent, _Component);
  var _super = _createSuper(StateBaseComponent);
  /**
   * Used to manage internal state of avatars
   */
  function StateBaseComponent(props) {
    var _this;
    _classCallCheck(this, StateBaseComponent);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      if (_this.stateManager) {
        _this.stateManager.doMount(_assertThisInitialized(_this));
      }
    });
    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      if (_this.stateManager) {
        _this.stateManager.unMount(_assertThisInitialized(_this));
      }
    });
    _defineProperty(_assertThisInitialized(_this), "updateView", function (action, arr, updated, data) {
      // extend by parent
      return true;
    });
    _this.props = props;

    // check for component manager
    if (!_this.props.manager) {
      var newLocal = 'Manager was not provided through props for component ' + _this.props.id;
      throw newLocal;
    }
    /*
    // make sure the manager is of correct type
    if (this.props.manager.constructor.name !== 'ComponentManager') {
      // eslint-disable-next-line no-throw-literal
      throw (
        "Constructor must be component manager. Got '" +
        this.props.manager.constructor.name +
        "' for component " +
        this.props.id
      )
    }
    */
    // get the state memory manager
    _this.stateManager = _this.props.manager.getStateFactory().getManager(_this.props.id);
    if (!_this.stateManager) {
      throw new Error("State manager is missing for component '" + _this.props.id + "'. Should have been created by traversing layout tree");
    }
    if (_this.stateManager) {
      // apply initial state
      _this.state = _this.stateManager.getState();
    }
    _this.eventManager = _this.props.manager.getEventManager();
    return _this;
  }
  _createClass(StateBaseComponent, [{
    key: "triggerEvent",
    value: function triggerEvent(event, data, evt) {
      this.props.manager.getEventManager().addEvent(this.props.id, event, data, evt);
    }
  }, {
    key: "triggerAction",
    value: function triggerAction(action, data, evt) {
      this.props.manager.getEventManager().addAction(this.props.id, action, data, null, evt);
    }
  }, {
    key: "register",
    value: function register(actions, events, component_info) {
      this.props.manager.getEventManager().register(this.props.id, actions, events, component_info);
    }
  }, {
    key: "setInstanceState",
    value: function setInstanceState(state) {
      if (this.stateManager) {
        this.stateManager.setState(state);
      }
    }
  }]);
  return StateBaseComponent;
}(Component);
var StateBaseComponent$1 = {
  StateBaseComponent: StateBaseComponent
};

export { StateBaseComponent$1 as default };
//# sourceMappingURL=StateBaseComponent.js.map
