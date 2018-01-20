const TRANSFORM_REGEX = /((\w+?)\((.*?)\))/g;
const CAMELCASE_REGEX = /-([a-z])/g;

export const camelCase = value => value.replace(CAMELCASE_REGEX, g => g[1].toUpperCase());

export const camelCaseNodeName = ({nodeName, nodeValue}) => ({nodeName: camelCase(nodeName), nodeValue});

export const removeXLinkFromNodeValue = ({nodeName, nodeValue}) => ({nodeName: nodeName.replace('xlink:', ''), nodeValue});
export const removePixelsFromNodeValue = ({nodeName, nodeValue}) => ({nodeName, nodeValue: nodeValue.replace('px', '')});

export const transformAtts = ({nodeName, nodeValue, fillProp}) => {
  if (nodeName === 'style') {
    return nodeValue.split(';')
      .reduce((acc, attribute) => {
        const [property, value] = attribute.split(':');
        if (property == "")
            return acc;
        else
            return {...acc, [camelCase(property)]: fillProp && property === 'fill' ? fillProp : value};
      }, {});
  }

  return { nodeName, nodeValue };
};

export const getEnabledAttributes = enabledAttributes => ({nodeName}) => enabledAttributes.includes(camelCase(nodeName));
