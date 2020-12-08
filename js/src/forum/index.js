import { extend, override } from 'flarum/extend';
import LogInButtons from 'flarum/components/LogInButtons';
import LogInModal from 'flarum/components/LogInModal';
import GoogleLogInButton from './GoogleLogInButton';

app.initializers.add('luuhai48/oauth-google', () => {
    const onlyIcons = !!Number(app.data['fof-oauth.only_icons']);

    if (onlyIcons) {
        extend(LogInButtons.prototype, 'items', function (items) {
            items.remove("google");
        });

        override(LogInModal.prototype, 'body', function () {
            return [
                <LogInButtons />,
                app.forum.attribute('fof-oauth').find(item => {
                    return item && item.name === "google";
                })
                ?
                <div class="LogInButtons">
                    <GoogleLogInButton className={'Button LogInButton--google'} icon={'fab fa-google'} path={'/auth/google'}>
                        {app.translator.trans('fof-oauth.forum.log_in.with_google', {
                            provider: app.translator.trans('fof-oauth.lib.providers.google'),
                        })}
                    </GoogleLogInButton>
                </div>
                : null,
                <div className="Form Form--centered">{this.fields().toArray()}</div>
            ];
        });
    }
});