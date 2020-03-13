import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchUsers"
})
export class SearchUsersPipe implements PipeTransform {
  transform(items: any[], filter: Object): unknown {
    console.log(items, filter);

    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.fname.indexOf(filter) !== -1);
  }
}
