import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { Image, Container, DockerProvider } from './.gen/providers/docker';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    // define resources here

    new DockerProvider(this, "provider", {});

    const image = new Image(this, 'nginxImage', {
      name: 'nginx:latest',
      keepLocally: true,
    });

    new Container(this, 'nginxContainer', {
      image: image.latest,
      name: 'nginx-tf-typescript',
      ports: [
        {
          internal: 80,
          external: 8080,
        },
      ],
    });
  }
}

const app = new App();
new MyStack(app, 'tf-typescript');
app.synth();
