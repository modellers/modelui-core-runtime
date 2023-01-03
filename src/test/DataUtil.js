import jsf from 'json-schema-faker'

export const getSchemaGeneratedData = (schema) => {
  return jsf.generate(schema)
}
