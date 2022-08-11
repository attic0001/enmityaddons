import { FormRow, FormSwitch, FormSection } from 'enmity/components';
import { SettingsStore } from 'enmity/api/settings';
import { React } from 'enmity/metro/common';

interface SettingsProps {
    settings: SettingsStore;
}

export default ({ settings }: SettingsProps) => {
    return <FormSection>
        <FormRow
            label='Mute'
            trailing={
                <FormSwitch
                    value={settings.get('muted', true)}
                    onValueChange={() => settings.toggle('muted', true)}
                />
            }
        />

        <FormRow
            label='Suppress Everyone'
            trailing={
                <FormSwitch
                    value={settings.get('suppress_everyone', false)}
                    onValueChange={() => settings.toggle('suppress_everyone', false)}
                />
            }
        />

        <FormRow
            label='Suppress Roles'
            trailing={
                <FormSwitch
                    value={settings.get('suppress_roles', false)}
                    onValueChange={() => settings.toggle('suppress_roles', false)}
                />
            }
        />

        <FormRow
            label='Mobile Push Notifications'
            trailing={
                <FormSwitch
                    value={settings.get('mobile_push', true)}
                    onValueChange={() => settings.toggle('mobile_push', true)}
                />
            }
        />
    </FormSection>;
};