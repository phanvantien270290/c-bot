/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date March 08, 2021
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */
import React from "react"
interface IGenerateIconSVG {
    viewBox: string,//need for without icon Mat
    path: string,// view in icons.json file
    fill: string// need for without icon Mat
    xmlns: string;
    width?: string;
    height?: string;
    // isIconMaterial?: boolean | false, // true = generate with icon Mat
    // IconMat?: React.ReactElement// need for icon Mat
}

const GenerateIconSVG: React.FC<IGenerateIconSVG> = (props) => {
    // const { isIconMaterial = false } = props;
    // const IconMat = () => {
    //     return (
    //         <IconMat />
    //     )
    // }
    const IconWithoutMat = () => {
        if (!props) { return null }
        const newProps: IGenerateIconSVG = {...props, path: ''};
        return <svg {...newProps}
            dangerouslySetInnerHTML={{ __html: props.path }}>
        </svg>
    }


    return (
        <>
            <IconWithoutMat />

        </>
        // <>
        //     { isIconMaterial ? <IconMat /> : <IconWithoutMat />}
        // </>
    )
}
export { GenerateIconSVG }