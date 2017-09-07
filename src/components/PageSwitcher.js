import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContentSwitcher from 'react-content-switcher';


export default class PageSwitcher extends Component {
   constructor(props) {
      super(props);

      this._onContentLeave = this._onContentLeave.bind(this);
      this._onContentEnter = this._onContentEnter.bind(this);
   }

   switchTo(nextIndex) {
      const { cs  }= this.refs;

      const {
         index
      } = this.props;

      if( !cs || index === nextIndex )
         return;

      const direction = nextIndex < index ?
         'right' : 'left';

      this._nextIndex = nextIndex;

      cs.switch(direction);
   }

   _onContentLeave(direction) {

   }

   _onContentEnter(direction) {
      const {
         children,
         index,
         onChange
      } = this.props;

      let nextIndex = this._nextIndex;

      if(typeof nextIndex !== 'number') {
         const adder = direction === 'left' ?
            1 : -1;

         nextIndex = index + adder;
      }

      if( nextIndex < 0 )
         nextIndex = children.length - 1;
      else if( nextIndex > children.length - 1 )
         nextIndex = 0;

      delete this._nextIndex;
      onChange(nextIndex);
   }

   render() {
      const {
         children,
         width,
         height,
         threshold,
         index,
         loop,
         transitionTypeCancel,
         transitionTypeLeave,
         transitionTypeEnter,
         transitionDurationCancel,
         transitionDurationLeave,
         transitionDurationEnter,
         styleGenerator,
         style
      } = this.props;

      const switchDisabled = {
         top: true,
         right: false,
         bottom: true,
         left: false
      };

      const child = children[index];

      if( !loop ) {
         if( index === 0 )
            switchDisabled.right = true;
         else if( index === children.length - 1 )
            switchDisabled.left = true;
      }


      return (
         <ContentSwitcher
            ref='cs'
            width={ width }
            height={ height }
            threshold={ threshold }
            transitionTypeCancel={ transitionTypeCancel }
            transitionTypeLeave={ transitionTypeLeave }
            transitionTypeEnter={ transitionTypeEnter }
            transitionDurationCancel={ transitionDurationCancel }
            transitionDurationLeave={ transitionDurationLeave }
            transitionDurationEnter={ transitionDurationEnter }
            fixed={{
               horizonal: false,
               vertical: true
            }}
            switchDisabled={ switchDisabled }
            styleGenerator={ styleGenerator }
            style={ style }
            onContentLeave={ this._onContentLeave }
            onContentEnter={ this._onContentEnter }
         >
            { child }
         </ContentSwitcher>

      );
   }
}

PageSwitcher.propTypes = {
   children: PropTypes.node.isRequired,
   index: PropTypes.number.isRequired,
   width: PropTypes.number.isRequired,
   height: PropTypes.number.isRequired,
   threshold: PropTypes.number.isRequired,
   onChange: PropTypes.func.isRequired,

   loop: PropTypes.bool,

   transitionTypeCancel: PropTypes.string,
   transitionTypeLeave: PropTypes.string,
   transitionTypeEnter: PropTypes.string,

   transitionDurationCancel: PropTypes.number,
   transitionDurationLeave: PropTypes.number,
   transitionDurationEnter: PropTypes.number,

   styleGenerator: PropTypes.func,
   style: PropTypes.object,
};

PageSwitcher.defaultProps = {
   loop: false,
   switchStart: () => null,
};
