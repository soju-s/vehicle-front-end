import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeFilter'
})
export class PipeFilterPipe implements PipeTransform {

  transform(allClientName:any[],searchTerm:string,PropertyName:string): any[] {
   
    const result:any=[]
    if(!allClientName || searchTerm=='' || PropertyName==''){

      return allClientName
    }

    allClientName.forEach((name:any)=>{
      if(name[PropertyName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())){

        result.push(name)

      }
    })
    return result;
  }

}
