import { Container, Sprite, Spritesheet } from 'pixi.js'

export class Person extends Container {
  constructor(private spritesheet: Spritesheet) {
    super()
    const person = new Sprite(spritesheet.textures['explorer.png'])
    person.scale.set(2, 2)
    this.addChild(person)
  }
}