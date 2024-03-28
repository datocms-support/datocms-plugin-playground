import {RenderItemFormOutletCtx} from "datocms-plugin-sdk";
import {useEffect} from "react";

type PropTypes = {
    ctx: RenderItemFormOutletCtx;
};

export function DynamicFieldHider({ctx}: PropTypes) {

    // Manage field visibilities
    useEffect(() => {
        switch (ctx.formValues['field1']) {
            case 'hide':
                console.log("Hiding Field 2")
                ctx.toggleField('field2', false)
                break;
            case 'show':
                console.log("Showing Field 2")
                ctx.toggleField('field2', true)
                break;
        }
    }, [ctx.formValues]);

    // We don't need to show any UI for this
    return null;
}