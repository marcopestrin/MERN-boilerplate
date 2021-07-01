export const getSeverity = (color) => {
    let severity = "info";
    switch (color) {
        case 0:
            break;
        case 1:
            severity = "info"; // BLUE
            break;
        case 2:
            severity = "error"; // RED
            break;
        case 3:
            severity = "warning"; // YELLOW
            break;
        default:
            break;
    }

    return severity;
}