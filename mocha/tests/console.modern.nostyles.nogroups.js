var _console = {},
	_consleApply = Console.support.consoleApply;

if (Console.support.console && !Console.support.consoleStyles && !Console.support.consoleGroups && Console.support.functionGetters) {
	describe('Console (Modern Mode, No Styles, No Groups)', function(){
		describe('initialize', function(){
			it('should attach the console', function() {
				Console.support.consoleApply = false;

				// make the console test friendly
				_console.log = Console.consoleMethodReferences.log;
				_console.group = Console.consoleMethodReferences.log;
				_console.groupCollapsed = Console.consoleMethodReferences.log;
				_console.groupEnd = Console.consoleMethodReferences.log;
				_console.warn = Console.consoleMethodReferences.log;
				_console.info = Console.consoleMethodReferences.log;

				Console.consoleMethodReferences.log = function () {
					return Array.prototype.slice.call(arguments);
				};
				Console.consoleMethodReferences.group = function () {
					return Array.prototype.slice.call(arguments);
				};
				Console.consoleMethodReferences.groupCollapsed = function () {
					return Array.prototype.slice.call(arguments);
				};
				Console.consoleMethodReferences.groupEnd = function () {
					return Array.prototype.slice.call(arguments);
				};
				Console.consoleMethodReferences.warn = function () {
					return Array.prototype.slice.call(arguments);
				};
				Console.consoleMethodReferences.info = function () {
					return Array.prototype.slice.call(arguments);
				};

				Console.attach();
				Console.styles.attach();
				Console.styles.register({
					red: 'color:#de4f2a',
					blue: 'color:#1795de',
					underline: 'text-decoration:underline'
				});

				expect(!!console._log).to.eql(true);
			});
		});

		describe('#log()', function(){
			it('should work with a normal string', function() {
				expect(console.log('foobar')).to.eql(['foobar']);
			});

			it('should work with a styled string', function() {
				expect(console.log('foobar'.red)).to.eql(['foobar']);
			});

			it('should work with multiple styled strings', function() {
				expect(console.log('foo'.red + 'bar'.blue)).to.eql(['foobar']);
			});
		});

		describe('#group()', function(){
			it('should work with a normal string', function() {
				expect(console.group('foobar')).to.eql(['- foobar']);
				console.groupEnd();
			});

			it('should work with a styled string', function() {
				expect(console.group('foobar'.red)).to.eql(['- foobar']);
				console.groupEnd();
			});

			it('should work with multiple styled strings', function() {
				expect(console.group('foo'.red + 'bar'.blue)).to.eql(['- foobar']);
				console.groupEnd();
			});
		});

		describe('#groupCollapsed()', function(){
			it('should work with a normal string', function() {
				expect(console.groupCollapsed('foobar')).to.eql(['- foobar']);
				expect(console.groupCollapsed('foobar')).to.eql(['-- foobar']);
				expect(console.groupCollapsed('foobar')).to.eql(['--- foobar']);
				console.groupEnd();
				console.groupEnd();
				console.groupEnd();
			});

			it('should work with a styled string', function() {
				expect(console.groupCollapsed('foobar'.red)).to.eql(['- foobar']);
				console.groupEnd();
			});

			it('should work with multiple styled strings', function() {
				expect(console.groupCollapsed('foo'.red.underline + 'bar'.blue)).to.eql(['- foobar']);
				console.groupEnd();
			});
		});

		describe('#warn()', function(){
			it('should work with a normal string', function() {
				expect(console.warn('foobar')).to.eql(['foobar']);
			});

			it('should work with a styled string', function() {
				expect(console.warn('foobar'.red)).to.eql(['foobar']);
			});

			it('should work with multiple styled strings', function() {
				expect(console.warn('foo'.red.underline + 'bar'.blue)).to.eql(['foobar']);
			});
		});

		describe('#info()', function(){
			it('should work with a normal string', function() {
				expect(console.info('foobar')).to.eql(['foobar']);
			});

			it('should work with a styled string', function() {
				expect(console.info('foobar'.red)).to.eql(['foobar']);
			});

			it('should work with multiple styled strings', function() {
				expect(console.info('foo'.red.underline + 'bar'.blue)).to.eql(['foobar']);
			});
		});

		describe('uninitialize', function(){
			it('should detatch console', function() {
				Console.support.consoleApply = _consleApply;

				// restore the Console references
				Console.consoleMethodReferences.log = _console.log;
				Console.consoleMethodReferences.group = _console.group;
				Console.consoleMethodReferences.groupCollapsed = _console.groupCollapsed;
				Console.consoleMethodReferences.groupEnd = _console.groupEnd;
				Console.consoleMethodReferences.warn = _console.warn;
				Console.consoleMethodReferences.info = _console.info;

				// restore the console references
				Console.detach();

				expect(!!console.log.toString().match('[native code]')).to.eql(true);
			});
		});
	});
}