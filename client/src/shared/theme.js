const size = {
  mobile: '767px',
  tablet: '1024px',
  desktop: '1025px'
};

const theme = {
  main_color: 'rgb(255, 82, 82)',
  main_white: '#ffffff',
  main_black: '#343a40',
  main_bg_color: '#f7f8f9',
  main_green: '#12b886',
  main_green_h: 'rgb(18,184,134,0.7)',
  gray: '#adb5bd',
  post_bg: '#f1f3f5',
  black: '#343a40',
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
  flex_column:
    'display: flex; flex-direction:column; align-items: center; justify-content: space-between; ',
  flex_row:
    'display: flex; align-items: center; justify-content: space-between;',
  default_width:
    'width:100vw; max-width:768px; box-sizing:border-box; padding:0 1rem',
  max_width: `max-width:768px`,
  border_box: `box-sizing:border-box`,

  responsiveContainer: `
  @media (max-width: 1919px) {
    width: 1376px;
  }
  @media (max-width: 1440px) {
    width: 1280px;
  }
  @media (max-width: 1312px) {
    width: 912px;
  }
  @media (max-width: 944px) {
    width: calc(100% - 2rem);
  }
  @media (max-width: 767px) {
    width: calc(100% - 2rem);
  }
  width: 1728px;
  margin-left: auto;
  margin-right: auto;
  `,
};

export default theme;
