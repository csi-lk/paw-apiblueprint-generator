import { version } from '../package.json'
import path from './lib/path'

const APIBlueprintGenerator = () => {
  this.generate = (context, requests, options) => {
    const groups = context.getAllGroups()
    const output = {
      requests: [],
    }
    // Make groups palatable
    groups.map((group) => {
      output[group.id] = {
        name: group.name,
        order: group.order,
        requests: [],
      }
      return true
    })
    // Add all requests to output object or put underneath group
    requests.map((request) => {
      if (Object.prototype.hasOwnProperty.call(request, 'parent')) {
        output[request.parent.id].requests.push({
          ...request,
        })
        output[request.parent.id].url = path(request.url)
      } else {
        output.requests.push({
          ...request,
        })
      }
      return true
    })
    // Output
    return JSON.stringify(output)
  }
}

APIBlueprintGenerator.identifier = 'io.csilk.PawExtensions.APIBlueprintGenerator'
APIBlueprintGenerator.title = 'CSILK API Blueprint Generator'
APIBlueprintGenerator.fileExtension = 'apib'
APIBlueprintGenerator.version = version

registerCodeGenerator(APIBlueprintGenerator)
