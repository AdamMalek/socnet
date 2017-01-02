export interface IAlertify {
    reset(): IAlertify;
    alert(message: string, onOkay?: Function, onCancel?: Function): IAlertify;
    confirm(message: string, onOkay?: Function, onCancel?: Function): IAlertify;
    prompt(message: string, onOkay?: Function, onCancel?: Function): IAlertify;
    log(message: string, click?: Function): IAlertify;
    theme(themeName: string): IAlertify;
    success(message: string, click?: Function): IAlertify;
    error(message: string, click?: Function): IAlertify;
    cancelBtn(label: string): IAlertify;
    okBtn(label: string): IAlertify;
    delay(time: Number): IAlertify;
    placeholder(str: string): IAlertify;
    defaultValue(str: string): IAlertify;
    maxLogItems(max: Number): IAlertify;
    closeLogOnClick(bool: Boolean): IAlertify;
    logPosition(position: string): IAlertify;
    setLogTemplate(template: string): IAlertify;
    clearLogs(): IAlertify;
    parent(prt: HTMLElement): IAlertify;
}
