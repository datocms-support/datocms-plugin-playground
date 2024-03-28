import {connect} from 'datocms-plugin-sdk';
import {render} from './utils/render';
import SimpleDropdownManual from "./entrypoints/SimpleDropdownManual";
import SimpleDropdownAuto from "./entrypoints/SimpleDropdownAuto";
import ShowHideIframe from "./entrypoints/ShowHideIframe";
import {DynamicSelectField} from "./entrypoints/DynamicSelectField";
import {DynamicFieldHider} from "./entrypoints/DynamicFieldHider";

connect({

    manualFieldExtensions() {
        return [
            {
                id: 'SimpleDropdownManual',
                name: 'Simple Dropdown (Manual override)',
                type: 'addon',
                fieldTypes: ['text', 'string']

            },
            {
                id: 'SimpleDropdownAuto',
                name: 'Simple Dropdown (Default)',
                type: 'addon',
                fieldTypes: ['text', 'string']

            },
            {
                id: 'ShowHideIframe',
                name: 'Show/Hide iframe',
                type: 'addon',
                fieldTypes: ['boolean']
            },
            {
                id: 'DynamicSelectField',
                name: 'Dynamic Select Field',
                type: 'editor',
                fieldTypes: ['json']
            },

        ]
    },

    renderFieldExtension(id, ctx) {
        switch (id) {
            case 'SimpleDropdownManual':
                return render(<SimpleDropdownManual numberOfOptions={10} ctx={ctx}/>);
            case 'SimpleDropdownAuto':
                return render(<SimpleDropdownAuto numberOfOptions={10} ctx={ctx}/>);
            case 'ShowHideIframe':
                return render(<ShowHideIframe ctx={ctx}/>);
            case 'DynamicSelectField':
                return render(<DynamicSelectField ctx={ctx}/>);
        }
    },

    itemFormOutlets(model, ctx) {
        switch (model.attributes.api_key) {
            case 'dynamic_select':
                return [
                    {
                        id: 'DynamicFieldHider',
                        initialHeight: 0,
                    }]

            default:
                return [];
        }
    },

    renderItemFormOutlet(
        outletId,
        ctx,
    ) {
        render(<DynamicFieldHider ctx={ctx}/>);
    },

});