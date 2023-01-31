//class updates when async load call finishes, is used in the next loop,
//and then emptied again
export default
class saveContainer {
    constructor(data, hasFile) {
        this.data = data;
        this.hasFile = hasFile;
    }
    checkStatus() {
        return this.hasFile;
    }
    getSaveDataAndEmpty() {
        if (this.hasFile) {
            this.hasFile = false;
            let exportData = this.data;
            this.data = null;
            return exportData;
        }
    }
    empty() {
        this.data = null;
        this.hasFile = false;
    }
}