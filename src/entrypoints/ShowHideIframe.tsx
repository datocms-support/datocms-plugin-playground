import React, {useEffect, useMemo} from 'react';
import {Canvas} from 'datocms-react-ui';
import 'datocms-react-ui/styles.css';
import {RenderFieldExtensionCtx} from "datocms-plugin-sdk";

// Props type definition for the component
interface AddonProps {
    ctx: RenderFieldExtensionCtx;
}

const ShowHideIframe: React.FC<AddonProps> = ({ctx}) => {
    const isFieldOn = useMemo(() => ctx.formValues['boolean_field'], [ctx.formValues])

    useEffect(() => {
        if(isFieldOn) {
            ctx.startAutoResizer()
        } else {
            ctx.stopAutoResizer()
            ctx.updateHeight(0)
        }
    }, [isFieldOn, ctx])

    return (
        <Canvas ctx={ctx}>
            <div style={{background: 'red', color: 'white', padding: '5px'}}>
                    Boolean field is currently: `{isFieldOn ? 'ON' : 'OFF'}`
            </div>
        </Canvas>
    );
};

export default ShowHideIframe;