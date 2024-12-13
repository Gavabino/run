import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Nav from "../components/welcome/Nav";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Nav">
                <Nav/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews