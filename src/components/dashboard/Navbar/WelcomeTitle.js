import {useAuth} from "../../../contexts/AuthContext";
import moment from "moment";

const WelcomeTitle = () => {
    const {currentUser} = useAuth()
    const currentHour = moment().hour();
    let welcomeText;
    const style = {
        alignSelf: "center",
        padding: "10px",
        fontFamily: "Inter",
    }
    if (currentHour < 12) {
        welcomeText = "Good Morning,";
    } else if (currentHour < 18) {
        welcomeText = "Good Afternoon,";
    } else {
        welcomeText = "Good Evening,";
    }
    return (
        <div style={style}>{welcomeText} <span
            style={{
                color: "var(--light-accent)",
                fontWeight: "bold"
            }}>{currentUser.displayName}</span>
        </div>
    )
}
export default WelcomeTitle;