import { version } from '../package.json'

const APIBlueprintGenerator = function generator() {
//   this.response = function (exchange) {
//     if (!exchange) {
//       return null
//     }

//     const headers = []
//     let is_json = false
//     for (const key in exchange.responseHeaders) {
//       const value = exchange.responseHeaders[key]
//       if (['Content-Type', 'Connection', 'Date', 'Via', 'Server', 'Content-Length'].includes(key)) {
//         if (key === 'Content-Type') {
//           is_json = value.search(/(json)/i) > -1
//         }
//         continue
//       }

//       headers.push({ key, value })
//     }
//     const has_headers = (headers.length > 0)

//     let body = exchange.responseBody
//     const has_body = body.length > 0
//     if (has_body) {
//       if (is_json) {
//         body = JSON.stringify(JSON.parse(body), null, 4)
//       }
//       let body_indentation = '        '
//       if (has_headers) {
//         body_indentation += '    '
//       }
//       body = body.replace(/^/gm, body_indentation)
//     }

//     return {
//       statusCode: exchange.responseStatusCode,
//       contentType: exchange.responseHeaders['Content-Type'],
//       'headers?': has_headers,
//       headers,
//       'body?': has_headers && has_body,
//       body,
//     }
//   }

  // Generate a request dictionary for the mustache context from a paw Request
  //
  // @param [Request] exchange The paw HTTP request
  //
  // @return [Object] The template context object
  //
//   this.request = function (paw_request) {
//     const headers = []
//     let is_json = false
//     for (const key in paw_request.headers) {
//       const value = paw_request.headers[key]
//       if (['Content-Type'].includes(key)) {
//         is_json = (value.search(/(json)/i) > -1)
//         continue
//       }

//       headers.push({ key, value })
//     }
//     const has_headers = (headers.length > 0)

//     let { body } = paw_request
//     const has_body = body.length > 0
//     if (has_body) {
//       if (is_json) {
//         body = JSON.stringify(JSON.parse(body), null, 4)
//       }
//       let body_indentation = '        '
//       if (has_headers) {
//         body_indentation += '    '
//       }
//       body = body.replace(/^/gm, body_indentation)
//     }

//     const { description } = paw_request
//     const has_description = description && (description.length > 0)

//     if (has_headers || has_body || paw_request.headers['Content-Type']) {
//       return {
//         'headers?': has_headers,
//         headers,
//         contentType: paw_request.headers['Content-Type'],
//         'body?': has_headers && has_body,
//         body,
//         'description?': has_description,
//         description,
//       }
//     }
//   }

  // Get a path from a URL
  //
  // @param [String] url The given URL
  //
  // @return [String] The path from the URL
//   this.path = function (url) {
//     let path = url.replace(/^https?:\/\/[^\/]+/i, '')
//     if (!path) {
//       path = '/'
//     }

//     return path
//   }

  this.generate = (context, requests, options) => {
    // const title = context.document.name
    // const test = context.getCurrentRequest()
    // const pawRequest = context
    // const { url } = pawRequest
    // const template = readFile('apiblueprint.mustache')
    // return Mustache.render(template, {
    //   method: paw_request.method,
    //   path: this.path(url),
    //   request: this.request(paw_request),
    //   response: this.response(paw_request.getLastExchange()),
    // },
    // )
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
          parent: undefined,
          ...request,
        })
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
