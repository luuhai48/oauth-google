import Button from 'flarum/components/Button';

export default class GoogleLogInButton extends Button {
  static initAttrs(attrs) {
    attrs.className = (attrs.className || '') + ' LogInButton';

    attrs.onclick = function () {
      const width = 580;
      const height = 400;
      const $window = $(window);

      window.open(
        app.forum.attribute('baseUrl') + attrs.path,
        'logInPopup',
        `width=${width},` +
          `height=${height},` +
          `top=${$window.height() / 2 - height / 2},` +
          `left=${$window.width() / 2 - width / 2},` +
          'status=no,scrollbars=yes,resizable=no'
      );
    };

    super.initAttrs(attrs);
  }
}
