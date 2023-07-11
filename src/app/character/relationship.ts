export class Relationship {
  type?: string;

  description?: string;

  characterId?: string;

  characterName?: string;

  static isRelationshipArray(arr: Relationship[]): boolean {
    if (Array.isArray(arr)) {
      const isRefArray =
        arr.length > 0 &&
        arr.every(value => {
          return Relationship.isRelationship(value);
        });
      return isRefArray;
    }
    return false;
  }

  private static isRelationship(value: any): value is Relationship {
    return (
      typeof value === 'object' &&
      typeof value.type === 'string' &&
      typeof value.characterId === 'string' &&
      typeof value.characterName === 'string' &&
      typeof value.description === 'string'
    );
  }

  private static copyRelationship(value: Relationship): Relationship {
    return {
      type: value.type,
      description: value.description,
      characterId: value.characterId,
      characterName: value.characterName,
    };
  }

  static copyRelationshipArray(toCopy: Relationship[]): Relationship[] {
    const ref: Relationship[] = [];
    toCopy.forEach(value => {
      ref.push(Relationship.copyRelationship(value));
    });
    return ref;
  }
}
