/**
 * widget data ,layout information and  others widget's data
 */
export interface WidgetData{
    /**
     * widget id
     */
    id:number ,
    /**
     * layout  response information about the wideget
     */
    layout: any, 
    /**
     * widget data response ,like applicable machines , gibs, and similar infos
     */
    widgetData: any

    error:any;
   
}