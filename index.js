exports.handlers = {
  processingComplete: ({doclets}) => doclets.forEach(doclet => {
    if(!doclet.memberof) return

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
