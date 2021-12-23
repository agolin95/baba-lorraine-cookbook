function toTitleCase(string) {
    return string.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}
