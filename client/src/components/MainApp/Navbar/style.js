import { isFullNavDisplayed } from '../utilities';
import { calculateStyleForPseudoClassState } from '../../higherOrder';
import { headingFontFam, shadow, secondaryBackgroundColor } from '../style';

const textColor = '#ffffff';
const backgroundColor = secondaryBackgroundColor;

const navShadow = shadow(7);

const _navElFocusStyle = {
  color: '#f7f7f7',
  backgroundColor: 'rgba(0, 0, 0, .09)'
};
const interactiveNavElVarStyles = {
  innate: {
    color: textColor,
    backgroundColor: 'transparent'
  },
  hover: {
    color: '#fafafa',
    backgroundColor: 'rgba(0, 0, 0, .07)'
  },
  focus: _navElFocusStyle,
  active: {
    color: textColor,
    backgroundColor: 'rgba(255, 255, 255, .07)',
    ...shadow(2, undefined, undefined, true)
  },
  tabFocus: {
    ..._navElFocusStyle,
    outline: `solid 1px ${_navElFocusStyle.color}`
  }
};


export default function getStyle(brandItemInnerHeight, totalHeight, burgerPseudoState, windowWidth) {
  const overflowingText = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '100%',
    display: 'inline-block'
  };
  
  const jobLabelMaxWidth = '148px';
  const currentJobLabelMaxWidth = '140px';

  return {
    nav: {
      backgroundColor,
      ...navShadow
    },
    menu: {
      backgroundColor
    },
    brandTextItem: {
      paddingLeft: 2
    },
    brandText: {
      display: 'inline-block',
      height: '100%',
      fontFamily: headingFontFam,
      fontSize: brandItemInnerHeight && (brandItemInnerHeight / 2),
      lineHeight: 1,
      textAlign: 'left',
      color: textColor
    },
    brandImgItem: {
      paddingTop: 0,
      paddingBottom: 0,
      paddingRight: 0
    }, 
    brandImg: {
      height: totalHeight,
      maxHeight: totalHeight,
      width: totalHeight
    },
    jobsDropdownItem: {
      paddingRight: 16
    },
    jobLabel: {
      ...overflowingText,
      maxWidth: isFullNavDisplayed(windowWidth) ? jobLabelMaxWidth : '100%'
    },
    currentJobLabel: {
      ...overflowingText,
      maxWidth: isFullNavDisplayed(windowWidth) ? currentJobLabelMaxWidth : 'calc(100% - 2em)' // the `2em` is space for arrow. May need changed if arrow changes
    },
    currentJobDropdownArrow: {
      verticalAlign: 'text-top'
    },
    settingLabel: {
      paddingLeft: 28
    },
    burger: {
      color: textColor,
      ...calculateStyleForPseudoClassState(interactiveNavElVarStyles, burgerPseudoState)
    },
    welcomeText: {
      color: textColor
    },
    logoutButton: {
      innate: { marginLeft: 10 }
    }
  };
};

export { textColor, backgroundColor, navShadow, interactiveNavElVarStyles };