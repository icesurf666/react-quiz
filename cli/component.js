const path = require('path');
const fs = require('fs');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2), {
    alias: {
        name: 'n',
    }
});

const componentName = args.name;

fs.mkdirSync(
    path.resolve(__dirname, '..', 'src', 'components', componentName)
);

const componentCode = `import React, {PureComponent} from 'react';
import '../${componentName}/${componentName}.css';

export default class ${componentName} extends PureComponent {
    static defaultProps = {}
    
    render() {
        const {} = this.props;

        return (
            <div className="${componentName}"></div>
        );
    }
}
`;

fs.writeFileSync(
    path.resolve(__dirname, '..', 'src', 'components', componentName, `${componentName}.jsx`),
    componentCode,
);

fs.writeFileSync(
    path.resolve(__dirname, '..', 'src', 'components', componentName, `${componentName}.css`),
    `.${componentName} {}`,
);