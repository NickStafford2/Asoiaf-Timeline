export class Reference {
  bookId?: string;

  description?: string;

  static isReferenceArray(arr: Reference[]): boolean {
    if (Array.isArray(arr)) {
      const isRefArray =
        arr.length > 0 &&
        arr.every(value => {
          return Reference.isReference(value);
        });
      return isRefArray;
    }
    return false;
  }

  private static isReference(value: any): value is Reference {
    return (
      typeof value === 'object' &&
      typeof value.bookId === 'string' &&
      typeof value.description === 'string'
    );
  }

  private static copyRefernce(value: Reference): Reference {
    return {
      bookId: value.bookId,
      description: value.description,
    };
  }

  static copyRefernceArray(toCopy: Reference[]): Reference[] {
    const ref: Reference[] = [];
    toCopy.forEach(value => {
      ref.push(Reference.copyRefernce(value));
    });
    return ref;
  }
}
