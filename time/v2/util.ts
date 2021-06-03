import 'colors';

export function Exit(message: string): never {
    console.error(message.red)
    process.exit(1, )
}
