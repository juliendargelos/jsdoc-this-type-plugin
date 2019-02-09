const linkto = require('jsdoc/util/templateHelper').linkto

exports.handlers = {
  processingComplete: ({doclets}) => doclets.forEach(doclet => {
    if(!doclet.memberof) return

    if(doclet.signature && doclet.signature.includes('{this}')) {
      doclet.signature = doclet.signature.replace(/\{this\}/g, `{${linkto(doclet.memberof)}}`)
    }

    ;[doclet.returns, doclet.params]
      .reduce((types, properties) => {
        if(properties) properties.forEach(({type}) => types.push(type))
        return types
      }, [doclet.type])
      .forEach(type => type && type.names.forEach((name, index) => {
        if(name === 'this') type.names[index] = doclet.memberof
      }))
  })
}
