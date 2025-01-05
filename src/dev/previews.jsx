import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import Nav from "../components/welcome/Nav";
import ExpandedPreview from "../components/calendar/expandedPreview/ExpandedPreview";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Nav">
                <Nav/>
            </ComponentPreview>
            <ComponentPreview path="/ExpandedPreview">
                <ExpandedPreview/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews